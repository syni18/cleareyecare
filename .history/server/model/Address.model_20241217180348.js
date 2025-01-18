import mongoose from "mongoose";

const AddressesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    addresses: [
        {
            fullName: String,
            phoneNumber: String,
            pincode: String,
            locality: String,
            address: String,
            cityDistrictTown: String,
            state: 
        },
    ],
});