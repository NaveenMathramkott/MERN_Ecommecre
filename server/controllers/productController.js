export const createProductController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error while creating product`,
      error,
    });
  }
};
