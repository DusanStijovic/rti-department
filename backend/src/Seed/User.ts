
import mongoose, { connect } from 'mongoose';
import { User } from '../model/User';


const users = [
    {
        username: "admin@admin",
        password: "KQyBCqM0at7erRkOZAQqPA==",
        type: "admin"
    },
    {
        username: "duca@etf.bg.ac.rs",
        password: "M6dBYzajlDXvJeJnnw2J1g==",
        type: "zaposlen"
    },
    {
        username: "sd170145d@student.etf.rs",
        password: "6a+eaRS7TGAd3xDIJUX2lg==",
        type: "student"
    }
];



async function seedUsers() {
    for (let u of users) {
        let user = new User(u);
        await user.save()
    }
}




export { seedUsers };