function renderDSNV(dsnv) {
  console.log("dsnv: ", dsnv);
  var contentHTML = "";
  for (var i = 0; i < dsnv.length; i++) {
    var nhanVien = dsnv[i];
    var contentTr = `
        <tr>
            <td>${nhanVien.taiKhoan}</td>
            <td>${nhanVien.hoTen}</td>
            <td>${nhanVien.email}</td>
            <td>${nhanVien.ngayLam}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.tongLuong}</td>
            <td>${nhanVien.loaiNhanVien}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaNV('${nhanVien.taiKhoan}')">Delete</button>
            </td>
            <td> <button class="btn btn-danger" onclick="suaNV('${
              nhanVien.taiKhoan
            }')">Edit</button></td>
        </tr>
        `;
    contentHTML += contentTr;
  }
  document.getElementById("tableDanhSach").innerHTML = contentHTML;
}

function layThongTinTuForm() {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value;

  return new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
}
