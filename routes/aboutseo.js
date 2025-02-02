const express = require("express");
const AboutSeo = require('../models/aboutseo');
const router = express.Router();

router.put(
  "/:id",
  
  (req, res, next) => {
    const bannerId = req.params.id;

    const updatedAboutSeo = {
      heading: req.body.heading,
      description: req.body.description,
      keyword: req.body.keyword,
    };

    AboutSeo.findByIdAndUpdate(bannerId, updatedAboutSeo, { new: true })
      .then((updatedAboutSeo) => {
        if (!updatedAboutSeo) {
          return res.status(404).json({ error: "Banner not found" });
        }
        console.log(updatedAboutSeo);
        res.status(200).json({ message: "Data updated successfully", banner: updatedAboutSeo });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

router.get("", (req, res, next) => {
  AboutSeo.find().then((data) => {
    res.status(200).json({ seo: data });
  });
});



module.exports = router;
