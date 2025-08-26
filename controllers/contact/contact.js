module.exports = (req, res) => {
    res.status(200).render('contact',{
        errors: [],
        oldInput: { name: "", email: "", message: "" },
      });
};

//