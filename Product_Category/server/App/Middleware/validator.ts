export function validatecheck(req: any, res: any, next: any) {
    const {
        title,
        description,
        categoryId,
       
    } = req.body;
  
    const {file}=req
  

    if (!title) {
      return res.status(400).json({
        error: "Title field is required",
      });
    }
  

    if (!description) {
      return res.status(400).json({
        error: "Description field is required",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        error: "Category field is required",
      });
    }
  

    if (!file) {
      return res.status(400).json({
        error: "Image field is required",
      });
    }

  
    next();
  }
  