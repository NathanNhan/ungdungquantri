let Dia_chi_Img = 'http://localhost:8080';

const Th_ds_Phieu_Dat = async (type) => {
  let dsPhieu = [];
  let nhom = 1;
  if (type == "mobile") {
    await apiDanhSachPhieuDat(type).then(result => {
      dsPhieu = result;
      nhom = 2
    })
  }
  else if (type == "tivi") {
    await apiDanhSachPhieuDat(type).then(result => {
      dsPhieu = result;
    })
  } else {
    await apiDanhSachPhieuDat(type).then(result => {
      dsPhieu = result;
      nhom = 3;
    })
  }
  console.log(dsPhieu);
  in_Ds_Phieu_Dat(dsPhieu, Th_Phieudat, nhom);
}

//In danh sách phiếu đặt 
const in_Ds_Phieu_Dat = (ds = [], tags, nhom) => {
  let html = `<div>`;
  ds.forEach((item) => {
    let MasoSanPham = item.Ma_so
    html += `<h3 class="text-primary">Tên sản phẩm: ${item.Ten}</h3>`;
    html += `</div>`;
    if (item.Phieudat) {
      item.Phieudat.forEach((item) => {
        html += `<table class="table table-sm table-striped">
                    <thead class="bg-success text-white text-center">
                        <tr>
                            <th>Số Phiếu Đặt</th>
                            <th>Ngày đặt hàng</th>
                            <th>Số lượng</th>
                            <th>Đơn giá bán</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái</th>

                        </tr>
                    </thead>`
        html += `<tbody>
                  <tr>
                    <td>${item.So_Phieu_Dat}</td>
                    <td>${new Date(item.Ngay_Dat_hang).getDate()}/${new Date(item.Ngay_Dat_hang).getMonth()}/${new Date(item.Ngay_Dat_hang).getFullYear()}</td>
                    <td>${item.So_luong}</td>
                    <td>${item.Don_gia_Ban}</td>
                    <td>${item.Khach_hang.Ho_ten}</td>
                    <td>${item.Khach_hang.Email}</td>
                    <td>${item.Khach_hang.Dien_thoai}</td>
                    <td>${item.Khach_hang.Dia_chi}</td>
                    <td>${item.Tien}</td>
                    <td>
                       <select onchange="capNhatTrangThai(this.value,'${MasoSanPham}', '${nhom}', '${item.Ma_so}')">
                          <option value=${item.Trang_thai}>${(item.Trang_thai == "DANG_XU_LY" ? "Đang xử lý" : (item.Trang_thai == "DA_GIAO_HANG" ? "Đã giao hàng" : (item.Trang_thai == "DANG_VAN_CHUYEN" ? "Đang vận chuyển" :  "Chưa giao hàng")))}</option>
                          <option value="DANG_XU_LY">Đang xử lý</option>
                          <option value="DANG_VAN_CHUYEN">Đang vận chuyển</option>
                          <option value="DA_GIAO_HANG">Đã giao hàng</option>
                       </select>
                    </td>
                  </tr>
                </tbody>`
        html += `</table>`
      })
    }
  })
  tags.innerHTML = html;
};


const capNhatTrangThai = (trangthai, maso, nhom, masoPhieu) => {
  debugger;
  let newStatus = {
    maso,
    trangthai,
    masoPhieu,
    nhom: Number(nhom)
  }
  apiCapnhatTrangThai(newStatus).then(result => {
    console.log(result);
  });
}