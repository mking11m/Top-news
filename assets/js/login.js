$(function () {
    //切换注册
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.register').show()
    })

    $('#link_log').on('click', function () {
        $('.login').show()
        $('.register').hide()
    })



    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            let pwd = $('.register [name=password]').val()

            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //注册

    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('注册成功')
            $('.login').show()
            $('.register').hide()
        })
    })
    //登录
    $('#form-login').on('submit',function (e) {
        
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})