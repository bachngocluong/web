$(document).ready(function () {
    $('#giave').on('input', function () {
        var input = $(this).val();
        input = input.replace(/,/g, '').replace(/\./g, '');
        var formattedInput = Number(input).toLocaleString('en-US');
        $(this).val(formattedInput);
    });

    taiDanhSachChuyenBay();

    $('#chieu').change(function () {
        var chieu = $(this).val();
        if (chieu === "1") {
            $('#divNgayVe').show();
        } else {
            $('#divNgayVe').hide();
        }
    });

    $('#btnGui').click(function () {
        guiChuyenBay();
    });
});

function taiDanhSachChuyenBay() {
    $('#danhSachChuyenBay').empty();
    $.get("http://localhost:3000/chuyenbay", function (data) {
        var tableBody = '<thead><tr><th>Tên chuyến</th><th>Chiều</th><th>Hạng bay</th><th>Điểm đi</th><th>Điểm đến</th><th>Giờ</th><th>Ngày đi</th><th>Ngày về</th><th>Giá vé</th><th>Thao tác</th></tr></thead>';
        tableBody += '<tbody>';
        data.forEach(function (chuyenbay) {
            tableBody += '<tr>' +
                '<td>' + chuyenbay.tenchuyen + '</td>' +
                '<td>' + (chuyenbay.chieu === "1" ? 'Khứ hồi' : 'Một chiều') + '</td>' +
                '<td>' + chuyenbay.hangbay + '</td>' +
                '<td>' + chuyenbay.diemdi + '</td>' +
                '<td>' + chuyenbay.diemden + '</td>' +
                '<td>' + chuyenbay.gio + '</td>' +
                '<td>' + chuyenbay.ngaydi + '</td>';
            if (chuyenbay.chieu === "1") {
                tableBody += '<td>' + chuyenbay.ngayve + '</td>';
            } else {
                tableBody += '<td>-</td>';
            }
            tableBody += '<td>' + chuyenbay.giave + '</td>' +
                '<td>' +
                '<a href="#" class="btn btn-warning btn-sm" onclick="suaChuyenBay(\'' + chuyenbay.id + '\')">Sửa</a> ' +
                '<a href="#" class="btn btn-danger btn-sm" onclick="xoaChuyenBay(\'' + chuyenbay.id + '\')">Xóa</a>' +
                '</td>' +
                '</tr>';
        });
        tableBody += '</tbody>';
        $('#danhSachChuyenBay').append(tableBody);
    });
}

function xoaChuyenBay(id) {
    if (confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
        $.ajax({
            url: 'http://localhost:3000/chuyenbay/' + id,
            type: 'DELETE',
            success: function (result) {
                taiDanhSachChuyenBay();
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
                alert('Đã xảy ra lỗi khi xóa chuyến bay.');
            }
        });
    }
}

function suaChuyenBay(id) {
    $.get('http://localhost:3000/chuyenbay/' + id, function (data, status) {
        $('#tenchuyen').val(data.tenchuyen);
        $('#chieu').val(data.chieu);
        $('#hangbay').val(data.hangbay);
        $('#diemdi').val(data.diemdi);
        $('#diemden').val(data.diemden);
        $('#gio').val(data.gio);
        $('#ngaydi').val(data.ngaydi);
        $('#ngayve').val(data.ngayve);
        $('#giave').val(data.giave);

        $('#btnGui').off('click').click(function () {
            var tenchuyen = $('#tenchuyen').val();
            var chieu = $('#chieu').val();
            var hangbay = $('#hangbay').val();
            var diemdi = $('#diemdi').val();
            var diemden = $('#diemden').val();
            var gio = $('#gio').val();
            var ngaydi = $('#ngaydi').val();
            var ngayve = $('#ngayve').val();
            var giave = $('#giave').val();

            var data = {
                tenchuyen: tenchuyen,
                chieu: chieu,
                hangbay: hangbay,
                diemdi: diemdi,
                diemden: diemden,
                gio: gio,
                ngaydi: ngaydi,
                ngayve: ngayve,
                giave: giave
            };

            $.ajax({
                url: 'http://localhost:3000/chuyenbay/' + id,
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    taiDanhSachChuyenBay();
                    datLaiForm();
                    $('#btnGui').off('click').click(function () {
                        guiChuyenBay();
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                    alert('Đã xảy ra lỗi khi cập nhật chuyến bay.');
                }
            });
        });
    });
}

function datLaiForm() {
    $('#formChuyenBay')[0].reset();
    $('#divNgayVe').hide();
}

function guiChuyenBay() {
    var tenchuyen = $('#tenchuyen').val();
    var chieu = $('#chieu').val();
    var hangbay = $('#hangbay').val();
    var diemdi = $('#diemdi').val();
    var diemden = $('#diemden').val();
    var gio = $('#gio').val();
    var ngaydi = $('#ngaydi').val();
    var ngayve = $('#ngayve').val();
    var giave = $('#giave').val();

    var data = {
        tenchuyen: tenchuyen,
        chieu: chieu,
        hangbay: hangbay,
        diemdi: diemdi,
        diemden: diemden,
        gio: gio,
        ngaydi: ngaydi,
        ngayve: ngayve,
        giave: giave
    };

    $.ajax({
        url: 'http://localhost:3000/chuyenbay',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            taiDanhSachChuyenBay();
            datLaiForm();
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi khi đăng tin chuyến bay.');
        }
    });
}