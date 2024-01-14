import categoryModal from "../models/categoryModal.js";
import slugify from "slugify";

//controller for creating category

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: `name is required`,
      });
    }

    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: `Category already exist`,
      });
    }

    const category = await new categoryModal({
      name,
      slug: slugify(name, { lower: true }),
    }).save();
    res.status(200).send({
      success: true,
      message: `Category created`,
      category,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `error in category`,
      error,
    });
  }
};

// controller for updating the category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModal.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: `category updated successfully`,
      category,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: `error in updatting category`,
      error,
    });
  }
};

//controller for getting all the current category

export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModal.find({});
    res.status(200).send({
      success: true,
      message: `Getting category successfull`,
      category,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `Error while getting category`,
      error,
    });
  }
};

// controller for getting single category

export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModal.findOne({ slug: req.params.slug });
    if (category) {
      return res.status(200).send({
        success: true,
        message: `Getting single category successfull`,
        category,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: `No category found`,
      });
    }
  } catch (error) {
    return res.status(400).send({
      sucess: false,
      message: `error while getting single category`,
      error,
    });
  }
};

// controller for deleting the category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: `Category successfully deleted`,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: `Category is not deleted`,
    });
  }
};
