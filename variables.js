class Variables {//TODO actualizar las urls de las camaras
    static CITIES = [
        {
            id: 1,
            name: 'Santa Cruz',
            creadentials: {
                username: 'user',
                password: 'User123!'
            },
            branchOffices: [
                {
                    id: 1,
                    name: 'Brasil',
                    cameras: [{
                        login_url: 'http://192.168.1.17/doc/page/login.asp?_1693248976611',
                        report_url: 'http://192.168.1.17/doc/page/application.asp'
                    }]
                }, {
                    id: 2,
                    name: 'Equipetrol',
                    cameras: ['192.168.0.17']
                }, {
                    id: 3,
                    name: 'Pampa de la Isla',
                    cameras: ['192.168.2.17']
                }, {
                    id: 4,
                    name: 'La Villa',
                    cameras: ['192.168.4.223']
                }, {
                    id: 5,
                    name: 'Santos Dumont',
                    cameras: ['192.168.5.17']
                }
            ]
        }, {
            id: 2,
            name: 'La Paz',
            creadentials: {
                username: 'admin',
                password: 'hik12345'
            },
            branchOffices: [
                {
                    id: 9,
                    name: 'La Paz',
                    cameras: ['192.168.6.17', '192.168.6.18', '192.168.6.19', '192.168.6.20', '192.168.6.21', '192.168.6.22']
                }
            ]
        }
    ]
    static SCHEDULES = [
        {
            branchOffices: [1, 3, 4, 5],
            schedules: [
                {//Lunes
                    start: '09:00',
                    end: '21:00'
                }, {//Martes
                    start: '09:00',
                    end: '21:00'
                }, {//Miercoles
                    start: '09:00',
                    end: '21:00'
                }, {//Jueves
                    start: '09:00',
                    end: '21:00'
                }, {//Viernes
                    start: '09:00',
                    end: '21:00'
                }, {//Sabado
                    start: '09:00',
                    end: '21:00'
                }, {//Domingo y feriados
                    start: '10:00',
                    end: '19:00'
                }
            ]
        },
        {
            branchOffices: [2],
            schedules: [
                {//Lunes
                    start: '09:00',
                    end: '21:00'
                }, {//Martes
                    start: '09:00',
                    end: '21:00'
                }, {//Miercoles
                    start: '09:00',
                    end: '21:00'
                }, {//Jueves
                    start: '09:00',
                    end: '21:00'
                }, {//Viernes
                    start: '09:00',
                    end: '21:00'
                }, {//Sabado
                    start: '09:00',
                    end: '21:00'
                }, {//Domingo y feriados
                    start: '10:00',
                    end: '21:00'
                }
            ]
        }, {
            branchOffices: [9],
            schedules: [
                {//Lunes
                    start: '10:00',
                    end: '22:00'
                }, {//Martes
                    start: '10:00',
                    end: '22:00'
                }, {//Miercoles
                    start: '10:00',
                    end: '22:00'
                }, {//Jueves
                    start: '10:00',
                    end: '22:00'
                }, {//Viernes
                    start: '10:00',
                    end: '22:00'
                }, {//Sabado
                    start: '10:00',
                    end: '22:00'
                }, {//Domingo y feriados
                    start: '11:00',
                    end: '21:00'
                }
            ]
        }
    ]
}

module.exports = {
    Variables
}