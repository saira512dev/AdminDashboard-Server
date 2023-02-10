import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
            return {
                ...product._doc,
                stat
            }
            })
            )

            res.status(200).json(productsWithStats)
    } catch( error ) {
        res.status(404).json({message: error})
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role: "user"}).select("-password");

        res.status(200).json(customers)
    } catch( error ) {
        res.status(404).json({message: error})
    }
}

export const getTransactions = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        console.log("🚀 ~ file: client.js:41 ~ getTransactions ~ sort", sort)
        console.log("🚀 ~ file: client.js:41 ~ getTransactions ~ search", search)
        console.log("🚀 ~ file: client.js:41 ~ getTransactions ~ pageSize", pageSize)
        console.log("🚀 ~ file: client.js:41 ~ getTransactions ~ page", page)

        //formatted sort should look like {userId: -1}
        const generateSort = () => {
            const sortedParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortedParsed.field]: sortedParsed.sort = "asc" ? 1 : -1
            }

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i")}},
                { userId: { $regex: new RegExp(search, "i")}}
            ],
        }).sort(sortFormatted).skip(page * pageSize).limit(pageSize);
        console.log("🚀 ~ file: client.js:63 ~ getTransactions ~ transactions", transactions)

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        })
        console.log("🚀 ~ file: client.js:68 ~ getTransactions ~ total", total)

        res.status(200).json({transactions, total})
    } catch( error ) {
        res.status(404).json({message: error})
    }
}