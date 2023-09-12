function showMessage(idTag, message) {
  document.getElementById(idTag).innerHTML = message;
}

function kiemTraRong(value, idErr, message) {
  if (value.trim() === "") {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return true;
  }
}

function kiemTraTaiKhoan(value, idErr, message) {
  const re = /^[0-9]{4,6}$/;

  var isTK = re.test(value);
  if (isTK) {
    document.querySelector(idErr).innerHTML = "";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return false;
  }
}

function kiemTraTen(value, idErr, message) {
  const re = /^[a-zA-Z ]{2,30}$/;
  var isTen = re.test(value);
  if (isTen) {
    document.querySelector(idErr).innerHTML = "";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return false;
  }
}

function kiemTraEmail(value, idErr, message) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var isEmail = re.test(value);
  if (isEmail) {
    document.querySelector(idErr).innerHTML = "";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = message;
    return false;
  }
}

function kiemTraPass(value, idErr, message) {
  const re =
    /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,10}/;
  var isPass = re.test(value);
  if (isPass) {
    document.querySelector(idErr).innerHTML = "";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = message;
    return false;
  }

 
}

function kiemTraLuongCoBan(value, idErr, message) {
    if (value < 1000000 || value > 20000000) {
      document.querySelector(idErr).innerHTML = message;
      return false;
    } else {
      document.querySelector(idErr).innerHTML = "";
      return true;
    }
  }

function kiemTraChucVu(value,idErr, message){
    if(value  != "Sếp" && value  != "Trưởng phòng" && value  != "Nhân viên" ){
        document.querySelector(idErr).innerHTML = message;
        return false;
    } else {
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
}

function kiemTraGioLam(value, idErr, message){
    if(value <80 || value >200){
        document.querySelector(idErr).innerHTML = message;
        return false;
    } else{
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
}

function kiemTraTrung(id, dsnv, idErr, message) {
    let viTri = dsnv.findIndex(function (nv) {
      return nv.taiKhoan == id;
    });
    if (viTri != -1) {
      //  tìm thấy
      document.querySelector(idErr).innerHTML = message;
      return false;
    } else {
      document.querySelector(idErr).innerHTML = "";
      return true;
    }
  }

  function kiemTraDoDai(value, idErr, min, max, message) {
    var length = value.length;
    if (length >= min && length <= max) {
      document.querySelector(idErr).innerHTML = "";
      return true;
    } else {
      document.querySelector(idErr).innerHTML = message;
      return false;
    }
  }