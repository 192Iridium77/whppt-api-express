module.exports = {
  exec({ $mongo: { $db } }, { _id }) {
    return $db.collection('categories').deleteOne({ _id });
  },
};
