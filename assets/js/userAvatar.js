$(function () {
    let $image = $('#image')

    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let filelist = e.target.files

        if (filelist.length === 0) {
            return layui.layer.msg('请选择照片')
        }

        let file = e.target.files[0]

        let imgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    $('#btnUpload').on('click', function () {
        let dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败！')
                } 
                layui.layer.msg('更换头像成功！')

                window.parent.getUserinfo()
            }
        })
    })


})

