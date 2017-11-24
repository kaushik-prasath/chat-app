const expect = require('expect');
var {Users} = require('./users');

describe('Users', ()=> {

    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Kaushik prasath',
            room: 'Computer Science'
        },{
            id: '2',
            name: 'Nandhini Balu',
            room: 'Computer Science'
        },{
            id: '3',
            name: 'Arun kumar',
            room: 'Mathematics'
        }];
    });


    it('Should return an user object',()=>{
        var users = new Users();
        var user = {
            id: 25,
            name:'Kaushik prasath',
            room: 'Big boss fans'
        };

         var resUser = users.addUser(user.id,user.name,user.room);

         expect(users.users).toEqual([resUser]);

    });


    it('Should remove an user',()=>{
        var user = users.removeUser('1');

        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);        
    });

    it('Should not remove an user',()=>{
        var user = users.removeUser('123');
        
                expect(user).toNotExist();
            expect(users.users.length).toBe(3);        
        
    });

    it('Should find an user',()=>{
                var user = users.getUser('1');
                expect(user.id).toBe('1')
    });

    it('Should not find an user',()=>{
        var user = users.getUser('12');
       
        expect(user).toNotExist();   
        expect(user).toBe(undefined);   
        
     });


    it('Should return the list of user for Computer science',()=>{
        var userList = users.getUserList('Computer Science');

        expect(userList).toEqual(['Kaushik prasath','Nandhini Balu']);
    });

    it('Should return the list of user for Mathematics',()=>{
        var userList = users.getUserList('Mathematics');

        expect(userList).toEqual(['Arun kumar']);
    });
})