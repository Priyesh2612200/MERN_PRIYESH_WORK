export function validatecheck(req: any, res: any, next: any) {
    const {
        title,
        description,
        category,
       
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

    if (!category) {
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
  