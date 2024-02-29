let dsTivi = [];
let dsMobile = [];
let dsMathang = [];
let chu_deTivi = [];
let chu_deMobile = [];
let chu_deFood = [];
let chu_deAll = [];
const Xuat_ds = (type) => {
    if (type == "all") {
        apiTivi().then(result => {
            dsTivi = result;
        }).then(() => {
            apiDienthoai().then(result => {
                dsMobile = result;
            }).then(() => {
                apiMathang().then(result => {
                    dsMathang = result;
                    let data = [
                        {
                            name: "Sản phẩm",
                            data: [],
                            color: "chocolate"
                        }
                    ]
                    data[0].data = [dsTivi.length, dsMobile.length, dsMathang.length];
                    chu_deAll = ["tivi", "Mobile", "Mặt hàng"];
                    ve_bieu_do(data, chu_deAll);
                })
            })
        })
    }
    if (type == "tivi") {
        apiTivi().then(result => {
            dsTivi = result;
            let data = [
                {
                    name: "Tivi",
                    data: [],
                    color: "chocolate"
                }
            ]
            dsNhom = Array.from(new Set(dsTivi.map(x => x.Nhom.Ma_so))).map(Ma_so => {
                nhom = {
                    Ma_so: Ma_so,
                }
                return nhom
            })
            dsNhom.forEach((item) => {
                data[0].data.push(dsTivi.filter(x => x.Nhom.Ma_so == item.Ma_so).length);
                chu_deTivi.push(item.Ma_so);
            })
            ve_bieu_do(data, chu_deTivi);
        })
    }
    else if (type == "mobile") {
        apiDienthoai().then(result => {
            dsMobile = result;
            let data = [
                {
                    name: "Mobile",
                    data: [],
                    color: "red"
                }
            ]
            dsNhom = Array.from(new Set(dsMobile.map(x => x.Nhom.Ma_so))).map(Ma_so => {
                nhom = {
                    Ma_so: Ma_so,
                }
                return nhom
            })
            dsNhom.forEach((item) => {
                data[0].data.push(dsMobile.filter(x => x.Nhom.Ma_so == item.Ma_so).length);
                chu_deMobile.push(item.Ma_so);
            })
            ve_bieu_do(data, chu_deMobile);
        })
    }
    else if (type == "food") {
        apiMathang().then(result => {
            dsMathang = result;
            let data = [
                {
                    name: "Food",
                    data: [],
                    color: "blue"
                }
            ]
            dsNhom = Array.from(new Set(dsMathang.map(x => x.Nhom.Ma_so))).map(Ma_so => {
                nhom = {
                    Ma_so: Ma_so,
                }
                return nhom
            })
            dsNhom.forEach((item) => {
                data[0].data.push(dsMathang.filter(x => x.Nhom.Ma_so == item.Ma_so).length);
                chu_deFood.push(item.Ma_so);
            })
            ve_bieu_do(data, chu_deFood);
        })
    }


}

//Xuất biểu đồ

const ve_bieu_do = (data, chu_de) => {
    Highcharts.chart('Th_Bieu_do', {
        chart: {
            type: 'column' // column, bar, line
        },
        title: {
            text: 'Thống kê sản phẩm'
        },
        subtitle: {
            text: 'Thống kê sản phẩm theo nhóm sản phẩm'
        },
        xAxis: {
            categories: chu_de
        },
        yAxis: {
            title: {
                text: 'Sản phẩm bán hàng'
            }
        },

        series: data
    });
}