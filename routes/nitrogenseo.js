const express = require("express");
const NitrogenSeo = require('../models/nitrogenseo');
const router = express.Router();

router.put(
  "/:id",
  
  (req, res, next) => {
    const bannerId = req.params.id;

    const updatedNitrogenSeo = {
      heading: req.body.heading,
      description: req.body.description,
      keyword: req.body.keyword,
    };

    NitrogenSeo.findByIdAndUpdate(bannerId, updatedNitrogenSeo, { new: true })
      .then((updatedNitrogenSeo) => {
        if (!updatedNitrogenSeo) {
          return res.status(404).json({ error: "Banner not found" });
        }
        console.log(updatedNitrogenSeo);
        res.status(200).json({ message: "Data updated successfully", banner: updatedNitrogenSeo });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

router.get("", (req, res, next) => {
    console.log("2")
  NitrogenSeo.find().then((data) => {
    res.status(200).json({ seo: data });
  });
});



module.exports = router;
