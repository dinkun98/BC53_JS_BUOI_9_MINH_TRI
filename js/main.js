var dsnv = [];
const DSNV_LOCAL = "DSNV_LOCAL";

var jsonData = localStorage.getItem(DSNV_LOCAL);
if (jsonData != null) {
  // JSON.parse(jsonData) => array
  // convert array cũ ( lấy localStorage ) => không có key tinhDTB() => khi lưu xuống bị mất => khi lấy lên ko còn => convert thành array mới
  dsnv = JSON.parse(jsonData).map(function (item) {
    // item : phần tử của array trong các lần lặp
    // return của map()
    return new NhanVien(
      item.taiKhoan,
      item.hoTen,
      item.email,
      item.matKhau,
      item.ngayLam,
      item.luongCoBan,
      item.chucVu,
      item.gioLamTrongThang,
      item.tongLuong,
      item.loaiNhanVien
    );
  });
  console.log("dsnv", dsnv);
  renderDSNV(dsnv);
}

function themNV() {
  var nv = layThongTinTuForm();

  //kiểm tra tài khoản
  var isValid =
    kiemTraRong(nv.taiKhoan, "#tbTKNV", "Tài khoản không được để trống") &&
    kiemTraTrung(nv.taiKhoan, dsnv, "#tbTKNV", "Tài khoản này đã tồn tại") &&
    kiemTraDoDai(nv.taiKhoan, "#tbTKNV", 4, 6, "Tài khoản phải từ 4~6 ký tự !");

  //kiểm tra tên
  isValid &=
    kiemTraRong(nv.hoTen, "#tbTen", "Họ và Tên không được để trống !") &&
    kiemTraTen(nv.hoTen, "#tbTen");

  //kiểm tra email
  isValid &=
    kiemTraRong(nv.email, "#tbEmail", "Email không được để trống") &&
    kiemTraEmail(nv.email, "#tbEmail", "Email Không đúng định dạng !");

  // kiểm tra mật khẩu
  isValid &=
    kiemTraRong(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống") &&
    kiemTraPass(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  //kiểm tra ngày làm
  isValid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống") &&
  kiemTraNgay(nv.ngayLam, "#tbNgay", "Yêu cầu nhập đúng định dạng ngày");

  //kiểm tra định dạng lương
  isValid &=
    kiemTraRong(
      nv.luongCoBan,
      "#tbLuongCB",
      "Lương cơ bản không được để trống"
    ) &&
    kiemTraLuongCoBan(
      nv.luongCoBan,
      "#tbLuongCB",
      "Lương cơ bản phải nằm trong khoảng 1 000 000 - 20 000 000"
    );

  //kiểm tra định dạng chức vụ
  isValid &=
    // kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống") &&
    kiemTraChucVu(
      nv.chucVu,
      "#tbChucVu",
      "Hãy chọn đúng chức vụ có trong option"
    );

  //kiểm tra định dạng giờ làm
  isValid &=
    kiemTraRong(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Giờ làm không được để trống"
    ) &&
    kiemTraGioLam(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Số giờ làm phải nằm trong khoảng 80 - 200"
    );

  //Tính tổng lương
  if (nv.chucVu === "Sếp") {
    nv.tongLuong = nv.luongCoBan * 3;
  } else if (nv.chucVu === "Trưởng phòng") {
    nv.tongLuong = nv.luongCoBan * 2;
  } else if (nv.chucVu === "Nhân viên") {
    nv.tongLuong = nv.luongCoBan;
  }

  //Xếp loại nhân viên
  if (nv.gioLamTrongThang >= 192) {
    nv.loaiNhanVien = "Nhân viên xuất sắc";
  } else if (nv.gioLamTrongThang >= 176) {
    nv.loaiNhanVien = "Nhân viên giỏi";
  } else if (nv.gioLamTrongThang >= 160) {
    nv.loaiNhanVien = "Nhân viên khá";
  } else {
    nv.loaiNhanVien = "Nhân viên trung bình";
  }

  //Xóa nhân viên

  if (isValid) {
    dsnv.push(nv);
    // convert data
    let dataJson = JSON.stringify(dsnv);
    // lưu vào localStorage
    localStorage.setItem(DSNV_LOCAL, dataJson);
    //   render dssv lên table
    renderDSNV(dsnv);
    //   tbodySinhVien
    // resetForm();
  }
}

function suaNV(id) {
  var viTri = dsnv.findIndex(function (item) {
    return item.taiKhoan == id;
  });

  // show thông tin lên form
  var nv = dsnv[viTri];
  document.getElementById("tknv").value = nv.taiKhoan;
  document.getElementById("name").value = nv.hoTen;
  document.getElementById("email").value = nv.email;
  document.getElementById("password").value = nv.matKhau;
  document.getElementById("datepicker").value = nv.ngayLam;
  document.getElementById("luongCB").value = nv.luongCoBan;
  document.getElementById("chucvu").value = nv.chucVu;
  document.getElementById("gioLam").value = nv.gioLamTrongThang;
}

function xoaNV(id) {
  // splice: cut ,slice: copy
  var viTri = -1;
  for (var i = 0; i < dsnv.length; i++) {
    if (dsnv[i].taiKhoan == id) {
      viTri = i;
    }
  }
  if (viTri != -1) {
    // nếu tìm thấy vị trí thì xoá
    //   splice ( vị trí, số lượng)
    dsnv.splice(viTri, 1);
    renderDSNV(dsnv);
  }
}

function capNhatNV() {
  //  layThongTinTuForm() => return object sv
  var nv = layThongTinTuForm();

  var viTri = dsnv.findIndex(function (item) {
    return item.taiKhoan == nv.taiKhoan;
  });

    //kiểm tra tài khoản
    var isValid =
    kiemTraRong(nv.taiKhoan, "#tbTKNV", "Tài khoản không được để trống") &&
    kiemTraDoDai(nv.taiKhoan, "#tbTKNV", 4, 6, "Tài khoản phải từ 4~6 ký tự !");

  //kiểm tra tên
  isValid &=
    kiemTraRong(nv.hoTen, "#tbTen", "Họ và Tên không được để trống !") &&
    kiemTraTen(nv.hoTen, "#tbTen");

  //kiểm tra email
  isValid &=
    kiemTraRong(nv.email, "#tbEmail", "Email không được để trống") &&
    kiemTraEmail(nv.email, "#tbEmail", "Email Không đúng định dạng !");

  // kiểm tra mật khẩu
  isValid &=
    kiemTraRong(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống") &&
    kiemTraPass(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  //kiểm tra ngày làm
  isValid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống") &&
  kiemTraNgay(nv.ngayLam, "#tbNgay", "Yêu cầu nhập đúng định dạng ngày");

  //kiểm tra định dạng lương
  isValid &=
    kiemTraRong(
      nv.luongCoBan,
      "#tbLuongCB",
      "Lương cơ bản không được để trống"
    ) &&
    kiemTraLuongCoBan(
      nv.luongCoBan,
      "#tbLuongCB",
      "Lương cơ bản phải nằm trong khoảng 1 000 000 - 20 000 000"
    );

  //kiểm tra định dạng chức vụ
  isValid &=
    // kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống") &&
    kiemTraChucVu(
      nv.chucVu,
      "#tbChucVu",
      "Hãy chọn đúng chức vụ có trong option"
    );

  //kiểm tra định dạng giờ làm
  isValid &=
    kiemTraRong(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Giờ làm không được để trống"
    ) &&
    kiemTraGioLam(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Số giờ làm phải nằm trong khoảng 80 - 200"
    );

  //Tính tổng lương
  if (nv.chucVu === "Sếp") {
    nv.tongLuong = nv.luongCoBan * 3;
  } else if (nv.chucVu === "Trưởng phòng") {
    nv.tongLuong = nv.luongCoBan * 2;
  } else if (nv.chucVu === "Nhân viên") {
    nv.tongLuong = nv.luongCoBan;
  }

  //Xếp loại nhân viên
  if (nv.gioLamTrongThang >= 192) {
    nv.loaiNhanVien = "Nhân viên xuất sắc";
  } else if (nv.gioLamTrongThang >= 176) {
    nv.loaiNhanVien = "Nhân viên giỏi";
  } else if (nv.gioLamTrongThang >= 160) {
    nv.loaiNhanVien = "Nhân viên khá";
  } else {
    nv.loaiNhanVien = "Nhân viên trung bình";
  }

  dsnv[viTri] = nv;

  renderDSNV(dsnv);
}

document.querySelector("#btnTimNV").onclick = function () {
  var textSearch = document.querySelector("#searchName").value?.toLowerCase();
  var result = [];

  if (textSearch.length > 0) {
    result = dsnv.filter(function (nv) {
      return nv.loaiNhanVien.toLowerCase().includes(textSearch);
    });

    renderDSNV(result);
  } else {
    renderDSNV(dsnv);
  }
};

// function resetForm() {
//     document.getElementById("formQLSV").reset();
//   }
