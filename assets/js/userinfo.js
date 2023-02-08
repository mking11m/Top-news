$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                layui.form.val('userInfo',res.data)
            }
        })
    }

    initUserInfo()

    $('#btnReset').click(function(e){
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/my/userinfo',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ){
                    return layui.layer.msg('修改信息失败')
                }
                layui.layer.msg('修改信息成功')
                
                window.parent.getUserinfo()
                
            }

        })
    })
})