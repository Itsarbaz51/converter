import { Tool } from "@/models/tool.model";
import { File } from "@/models/file.model";
import { Conversion } from "@/models/conversion.model";

import EngineFactory from "@/engines/engine.factory";

import ImageKitService from "@/services/imagekit.service";

import { ApiError } from "@/utils/ApiError";

export const convertService = async ({ slug, file, user }) => {

    // 1. Find Tool

    const tool = await Tool.findOne({
        slug,
        active: true
    });

    if (!tool) {
        throw new ApiError(404, "Tool not found");
    }

    //-----------------------------------------
    // 2. Validate Input Format
    //-----------------------------------------

    const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (!tool.inputFormats.includes(extension)) {
        throw new ApiError(
            400,
            `Only ${tool.inputFormats.join(", ")} files are allowed`
        );
    }

    //-----------------------------------------
    // 3. Buffer
    //-----------------------------------------

    const buffer = Buffer.from(
        await file.arrayBuffer()
    );

    //-----------------------------------------
    // 4. Upload Original
    //-----------------------------------------

    const uploadedOriginal =
        await ImageKitService.uploadFile({
            file: buffer,
            fileName: file.name,
            folder: "/converter/original"
        });

    //-----------------------------------------
    // 5. Save Original File
    //-----------------------------------------

    const originalFile =
        await File.create({

            userId: user?._id || null,

            originalName: file.name,

            filename: uploadedOriginal.name,

            extension,

            mimeType: file.type,

            size: file.size,

            category: tool.category,

            storageProvider: "imagekit",

            storageKey: uploadedOriginal.filePath,

            storageUrl: uploadedOriginal.url,

            checksum: uploadedOriginal.checksum,

            expiresAt: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            )

        });

    //-----------------------------------------
    // 6. Create Conversion
    //-----------------------------------------

    const conversion =
        await Conversion.create({

            userId: user?._id || null,

            inputFileId: originalFile._id,

            toolId: tool._id,

            inputFormat: extension,

            outputFormat:
                tool.outputFormats[0],

            status: "processing",

            progress: 0

        });

    //-----------------------------------------
    // 7. Engine
    //-----------------------------------------

    const engine =
        EngineFactory.get(tool.engine);

    const convertedBuffer =
        await engine.convert(
            buffer,
            tool.outputFormats[0]
        );

    //-----------------------------------------
    // Remaining next...
    //-----------------------------------------

    //-----------------------------------------
    // 8. Upload Converted File
    //-----------------------------------------

    const outputExtension = tool.outputFormats[0];

    const uploadedConverted =
        await ImageKitService.uploadFile({
            file: convertedBuffer,
            fileName: `${Date.now()}.${outputExtension}`,
            folder: "/converter/converted"
        });


    //-----------------------------------------
    // 9. Save Output File
    //-----------------------------------------

    const outputFile =
        await File.create({

            userId: user?._id || null,

            originalName: uploadedConverted.name,

            filename: uploadedConverted.name,

            extension: outputExtension,

            mimeType: `image/${outputExtension}`,

            size: uploadedConverted.size,

            category: tool.category,

            storageProvider: "imagekit",

            storageKey: uploadedConverted.filePath,

            storageUrl: uploadedConverted.url,

            checksum: uploadedConverted.checksum,

            expiresAt: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            )

        });


    //-----------------------------------------
    // 10. Update Conversion
    //-----------------------------------------

    conversion.outputFileId = outputFile._id;

    conversion.status = "completed";

    conversion.progress = 100;

    conversion.completedAt = new Date();

    conversion.processingTime =
        conversion.completedAt - conversion.createdAt;

    await conversion.save();


    //-----------------------------------------
    // 11. Return Response
    //-----------------------------------------

    return {

        conversionId: conversion._id,

        originalFileId: originalFile._id,

        outputFileId: outputFile._id,

        downloadUrl: outputFile.storageUrl

    };

};