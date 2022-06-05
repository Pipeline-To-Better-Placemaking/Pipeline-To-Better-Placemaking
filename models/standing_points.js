const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ObjectId = mongoose.Schema.Types.ObjectId;
const points_schema = mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },
  refCount: {
    type: Number,
    required: true,
    default: 1,
  },

  title: String,
});

const Standing_Points = (module.exports = mongoose.model(
  "Standing_Points",
  points_schema
));

module.exports.updatePoint = async function (pointId, newPoint) {
  return await Standing_Points.updateOne(
    { _id: pointId },
    {
      $set: {
        title: newPoint.title,
        longitude: newPoint.longitude,
        latitude: newPoint.latitude,
      },
    }
  );
};

module.exports.removeRefrence = async function (pointId) {
  try {
    point = await Standing_Points.findById(pointId);
    console.log(point);
    console.log(point.refCount);
    point.refCount = point.refCount - 1;
    if (point.refCount <= 0) {
      return await Standing_Points.findByIdAndDelete(pointId);
    } else {
      let newPoint = await point.save();
      console.log(newPoint);
      console.log("After saving DECREASE in ref");
    }
  } catch (error) {
    console.log("breaking inside REMOVE try: -----" + error);
    res.status(500).send(err);
  }

  // try {
  //   point = await Standing_Points.findById(pointId);
  //   console.log("before decrease: " + point.refCount);
  //   const newRef = point.refCount - 1;
  //   console.log("after decrease: " + newRef);
  //   if (newRef <= 0) {
  //     return await Standing_Points.findByIdAndDelete(pointId);
  //   } else {
  //     Standing_Points.findOneAndUpdate(
  //       { _id: pointId },
  //       { $inc: { refCount: -1 } },
  //       { new: true }
  //     ),
  //       (err, point) => {
  //         // callback
  //         console.log(point);
  //       };
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};

module.exports.addRefrence = async function (pointId) {
  try {
    point = await Standing_Points.findById(pointId);
    point.refCount = point.refCount + 1;
    let newPoint = await point.save();
    console.log(newPoint);
    console.log("After saving INCREASE in ref");
  } catch (error) {
    console.log("breaking inside ADD try: -----" + error);
    res.status(500).send(err);
  }

  // try {
  //   point = await Standing_Points.findById(pointId);
  //   console.log("before increase: " + point.refCount);
  //   const newRef = point.refCount + 1;
  //   console.log("after increase: " + newRef);
  //   Standing_Points.findOneAndUpdate(
  //     { _id: pointId },
  //     { $inc: { refCount: 1 } },
  //     { new: true },
  //     (err, point) => {
  //       // callback
  //       console.log(point);
  //     })
  // } catch (err) {
  //   console.log(err);
  // }
};
