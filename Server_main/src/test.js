const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addRow = async () => {
    try {
        const newRow = await prisma.col.create({
            data: {
                num: 2,
                rowId: '06b29df4-5a43-441f-bb7f-645fabc46e0b',
                data:'ice tea'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

addRow()