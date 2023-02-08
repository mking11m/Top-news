$(function () {
    //调用用户信息
    getUserinfo()
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出', { icon: 4, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})
//定义调用用户信息
function getUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用用户头像和名称
            renderAvatar(res.data)
        }

    })
}
//定义渲染用户头像和名称
function renderAvatar(user) {
    //获取用户名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic) {
        //显示用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        //隐藏名称头像
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}