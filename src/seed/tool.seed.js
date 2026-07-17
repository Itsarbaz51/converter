import { Tool } from "../models/tool.model.js";

export const seedTools = async () => {
  const exists = await Tool.findOne({
    slug: "png-to-jpg",
  });

  if (exists) {
    console.log("Tool already exists");
    return;
  }

  await Tool.create({
    name: "PNG to JPG",
    slug: "png-to-jpg",
    category: "image",
    description: "Convert PNG to JPG",
    inputFormats: ["png"],
    outputFormats: ["jpg"],
    engine: "sharp",
    active: true,
  });

  console.log("PNG to JPG tool created");
};
