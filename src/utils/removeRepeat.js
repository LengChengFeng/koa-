
function removeRepeat(oldArr) {
    var allArr = [];
    for (var i = 0; i < oldArr.length; i++) {
        var flag = true;
        for (var j = 0; j < allArr.length; j++) {
          if (oldArr[i].Id == allArr[j].Id) {
            flag = false;
          }
        }
        if (flag) {
          allArr.push(oldArr[i]);
        }
      }
      return allArr;
}

module.exports = {removeRepeat}