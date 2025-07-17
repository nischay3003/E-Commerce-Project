const Address = require("../models/addressModel");
const User = require("../models/userModel");

async function addAddress(req, res) {
    try {
        const { street, city, state, pinCode, country } = req.body;
        const user_id = req.user.id;
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        await Address.create({
            user_id,
            street,
            city,
            state,
            pinCode,
            country
        });
        return res.status(201).json({ message: "Address successfully added for the user" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add address" });
    }
}

async function getAllAddresses(req, res) {
    try {
        const user_id = req.user.id;
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const addresses = await Address.findAll({ where: { user_id } });
        return res.status(200).json({
            addresses: addresses
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch address" });
    }
}

async function updateAddress(req, res) {
    try {
        const user_id = req.user.id;
        const add_id = req.params.id;
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const address = await Address.findOne({ where: { user_id, id: add_id } });
        if (!address) {
            return res.status(404).json({ message: "Address doesn't exist" });
        }
        const { street, city, state, pinCode, country } = req.body;
        if (street) address.street = street;
        if (city) address.city = city;
        if (state) address.state = state;
        if (pinCode) address.pinCode = pinCode;
        if (country) address.country = country;
        await address.save();
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update address" });
    }
}

async function deleteAddress(req, res) {
    try {
        const user_id = req.user.id;
        const add_id = req.params.id;
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const address = await Address.findOne({ where: { user_id, id: add_id } });
        if (!address) {
            return res.status(404).json({ message: "Address doesn't exist" });
        }
        await address.destroy();
        return res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to delete address" });
    }
}

module.exports = { addAddress, getAllAddresses, updateAddress, deleteAddress };
