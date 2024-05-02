class OrganizationRepresentative{
    username: string;
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}

const representatives = [

    {username: 'Kareem ElMeteny', password: '123456'},
    {username: 'Yassin ElHelly', password: '123457'},
    {username: 'Ahmed Hossam', password: '123458'},
    {username: 'Youssef Khamis', password: '123459'},
    {username: 'Raghad Helal', password: '123460'},
    {username: 'Haneen Tarek', password: '123461'},
];

export {representatives};

export default OrganizationRepresentative;


