const dang_nhap=()=>{
    let ten=document.querySelector("#Th_Ten_Dang_nhap").value.trim();
    let matkhau=document.querySelector("#Th_Mat_khau").value.trim();
    if(ten!="" && matkhau!=""){
        
        let nguoidung={
            "Ten_Dang_nhap":ten,
            "Mat_khau": matkhau
        }
        console.log(nguoidung);
        apiDangnhap(nguoidung).then(result=>{
            console.log(result)
            if (result.Ho_ten){
                // Lưu session
                let user = sessionStorage.setItem('user', JSON.stringify(result));
                // Chuyển trang
                if(result.Nhom.Ma_so == "NHAN_VIEN_GIAO_HANG" && result.access_token) {
                    window.location ="../giaohang";
                } else {
                    window.location="quantri.html";
                }
            }else{
                alert('Thông tin đăng nhập không hợp lệ')
            }
        }).catch(err=>{
            console.log(err)
        })
    }else{
        alert('Dữ liệu không hợp lệ')
    }

}

