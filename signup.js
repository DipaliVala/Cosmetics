const { MongoClient } = require('mongodb');
async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('mydatabase');
        const collection = database.collection('mycollection');
        const result = await collection.deleteMany({ name: 'John' });
        console.log(`${result.deletedCount} documents deleted.`);
    } finally {
        await client.close();
    }
}
main().catch(console.error);