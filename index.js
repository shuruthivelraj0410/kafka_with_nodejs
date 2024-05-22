import { Kafka, Partitioners } from "kafkajs";


const kafka = new Kafka({
    clientId : "my-kafka",
    brokers:['localhost:9092']
});
const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});
const consumer = kafka.consumer({
    groupId :"123"
});
( async()=>{
try{
await producer.connect();
await producer.send({
    topic:"topic2_test",
    messages:[{value:"hi idiot"}]
});
await consumer.connect();
await consumer.subscribe({
    topic :"topic2_test",
    fromBeginning : true
})
await consumer.run({
    eachMessage: async({topic,partition,message})=>{
console.log("******************",topic,"***********",partition,"********",message)
    }
})
}catch(e){
    console.log("------------------>>>",e)
}
})()