import { Tool } from "@/models/tool.model";
import { ApiError } from "@/utils/ApiError";

export const createToolService = async (payload) => {
  const exists = await Tool.findOne({
    slug: payload.slug.toLowerCase().trim(),
  });

  if (exists) {
    throw new ApiError(409, "Tool already exists");
  }

  const tool = await Tool.create({
    ...payload,
    slug: payload.slug.toLowerCase().trim(),
  });

  return tool;
};

export const getAllToolsService = async ({
  page = 1,
  limit = 10,
  search = "",
  category,
  engine,
  active,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        slug: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (engine) {
    query.engine = engine;
  }

  if (active !== undefined) {
    query.active = active === "true";
  }

  const skip = (page - 1) * limit;
  console.log(query);

  const [tools, total] = await Promise.all([
    Tool.find(query)
      .sort({
        priority: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),

    Tool.countDocuments(query),
  ]);

  console.log(tools);

  return {
    tools,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

export const getToolService = async (id) => {
  const tool = await Tool.findById(id);

  if (!tool) {
    throw new ApiError(404, "Tool not found");
  }

  return tool;
};

export const updateToolService = async (id, payload) => {
  const tool = await Tool.findById(id);

  if (!tool) {
    throw new ApiError(404, "Tool not found");
  }

  if (payload.slug) {
    const exists = await Tool.findOne({
      slug: payload.slug.toLowerCase(),
      _id: {
        $ne: id,
      },
    });

    if (exists) {
      throw new ApiError(409, "Slug already exists");
    }

    payload.slug = payload.slug.toLowerCase().trim();
  }

  Object.assign(tool, payload);

  await tool.save();

  return tool;
};

export const deleteToolService = async (id) => {
  const tool = await Tool.findById(id);

  if (!tool) {
    throw new ApiError(404, "Tool not found");
  }

  tool.active = false;

  await tool.save();

  return tool;
};
