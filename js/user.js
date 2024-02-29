let Dia_chi_Img = 'http://localhost:8080';

var capNhat = true;
const Xuat_Danh_sach = (ds) => {

    let html = ``;
    ds.sort((a, b) => a.Ho_ten.localeCompare(b.Ho_ten))
    ds.forEach((item, index) => {
        html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td>${item.Ho_ten}</td>
            <td class="text-right" >${item.Ten_Dang_nhap}</td>
            
            <td class="text-center">${item.Nhom.Ten}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa Điện thoại' onclick="updateMobile('${item.Ma_so}')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteMobile('${item.Ma_so}')" title='Xóa Điện thoại'>
                    <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `
    })

    document.querySelector("#Th_Danhsach").innerHTML = html;
}

const KeyCode = (event) => {
    if (event.keyCode == 13) {
        let gtTim = event.target.value.trim()
        let ds = dsNguoidung.filter(x => x.Ho_ten.toLowerCase().includes(gtTim.toLowerCase()))
        Xuat_Danh_sach(ds)

    }
}
// Add Mobile
const insertUser = () => {
    capNhat = true;
    showModal();
}
// Update Mobile
const updateMobile = (key) => {
    capNhat = false;
    let item = dsNguoidung.find(x => x.Ma_so == key);
    showModal(item);

}
// Delete Mobile
const deleteMobile = (key) => {
    if (confirm('Hệ thống sẽ Xóa Dữ liệu...?')) {
        let condition = {
            "Ma_so": key
        }
        apiNguoidungDelete(condition).then(result => {
            alert('Xóa thành công');
            window.location.reload();
        })
    }
}
// Show Modal
const showModal = (item = null) => {
    let Nhom = "";
    document.querySelector("#ModalTitle").innerHTML = `Thêm Người dùng`;
    if (item) {
        document.querySelector("#ModalTitle").innerHTML = `Sửa Người dùng`;

        Nhom = item.Nhom_Nguoi_dung.Ma_so;
    }

    let html = ``
    html += `
    <div class="form-group">
        <input type="text" class="form-control" id="Th_Ma_so" style=""
            value="${item ? item.Ma_so : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Ten">Họ Tên</label>
        <input type="text" class="form-control" id="Th_Ten" 
            placeholder="Họ và Tên" value="${item ? item.Ho_ten : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Don_gia_Nhap">Tên Đăng nhập</label>
        <input type="text" class="form-control" id="Th_Ten_Dang_nhap" 
            placeholder="Tên đăng nhập" value="${item ? item.Ten_Dang_nhap : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Mat_khau">Mật khẩu</label>
        <input type="text" class="form-control" id="Th_Mat_khau"
            placeholder="Mật khẩu" value="${item ? item.Mat_khau : ''}">
    </div>
   
    <div class="form-group">
        <label for="Th_Nhom_Nguoi_dung">Nhóm Người dùng</label>
        <select id="Th_Nhom_Nguoi_dung">
            <option value="NHAN_VIEN_BAN_HANG" ${(Nhom == 'NHAN_VIEN_BAN_HANG' ? 'selected' : '')} >NHAN_VIEN_BAN_HANG</option>
            <option value="NHAN_VIEN_NHAP_HANG" ${Nhom == 'NHAN_VIEN_NHAP_HANG' ? 'selected' : ''}>NHAN_VIEN_NHAP_HANG</option>
            <option value="QUAN_LY_CUA_HANG" ${Nhom == 'QUAN_LY_CUA_HANG' ? 'selected' : ''}>QUAN_LY_CUA_HANG</option>
            <option value="QUAN_LY_NHAP_HANG" ${Nhom == 'QUAN_LY_NHAP_HANG' ? 'selected' : ''}>QUAN_LY_NHAP_HANG</option>
            <option value="QUAN_LY_BAN_HANG" ${Nhom == 'QUAN_LY_NHAP_HANG' ? 'selected' : ''}>QUAN_LY_BAN_HANG</option>
            <option value="QUAN_LY_GIAO_HANG" ${Nhom == 'QUAN_LY_GIAO_HANG' ? 'selected' : ''}>QUAN_LY_GIAO_HANG</option>
        </select>
    </div>`

    document.querySelector("#ModalBody").innerHTML = html

}

// Get key end, create key new
const autoKey = () => {
    let keyNhom = Th_Nhom_Nguoi_dung.value;
    let arrNhom = dsNguoidung.filter(x => x.Nhom_Nguoi_dung.Ma_so == keyNhom)
    arrNhom.sort((a, b) => { return Number(a.Ma_so.trim().split("_")[1]) - Number(b.Ma_so.trim().split("_")[1]) })
    let keyEnd = arrNhom[arrNhom.length - 1];
    let num = Number(keyEnd.Ma_so.split("_")[1]) + 1;
    keyNhom = keyNhom.concat("_", num.toString());
    return keyNhom;
}

// Save 
const saveUser = () => {

    let Ma_so = (document.querySelector("#Th_Ma_so").value != "") ? document.querySelector("#Th_Ma_so").value : autoKey();
    console.log(Ma_so);
    //return false;
    let Ho_ten = document.querySelector("#Th_Ten").value.trim();
    let Ten_Dang_Nhap = document.querySelector("#Th_Ten_Dang_nhap").value.trim();
    let Nhom_Nguoi_dung = document.querySelector("#Th_Nhom_Nguoi_dung").value;
    
    let Mat_khau = document.querySelector("#Th_Mat_khau").value.trim();
    if (capNhat) {
        // Insert
        let userNew = {
            "Ho_ten": Ho_ten,
            "Ma_so": Ma_so,
            "Ten_Dang_nhap": Ten_Dang_Nhap,
            "Mat_khau": Mat_khau,
            "Nhom": {
                "Ten": Nhom_Nguoi_dung,
                "Ma_so": Nhom_Nguoi_dung
            },

        }

        //console.log(mobileNew)
        //return false;
        // Call API
        apiNguoidungInsert(userNew).then(result => {
            console.log(result);
            apiNguoidung().then(result => {
                dsNguoidung = result;
                Xuat_Danh_sach(dsNguoidung);
                document.querySelector("#ModalCancel").click();
            })
        })


    } else {
        // Update
        let userUpdate = {
            condition: {
                "Ma_so": Ma_so
            },
            update: {
                $set: {
                    "Ho_ten": Ho_ten,
                    "Ma_so": Ma_so,
                    "Ten_Dang_nhap": Ten_Dang_Nhap,
                    "Mat_khau": Mat_khau,
                    "Nhom": {
                        "Ten": Nhom_Nguoi_dung,
                        "Ma_so": Nhom_Nguoi_dung
                    },
                }

            }
        }
        // console.log(mobileUpdate)
        // Call API
        apiNguoidungUpdate(userUpdate).then(result => {
            //console.log(result);
            apiNguoidung().then(result => {
                dsNguoidung = result;
                Xuat_Danh_sach(dsNguoidung);
                document.querySelector("#ModalCancel").click();
            })
            //window.location.reload();
        })


    }


}



