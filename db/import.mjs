import mongoose from 'mongoose';
import models from '../src/db/models/index';

const { Producer, Category, Product, User, Order } = models;

const SAMSUNG = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Samsung'
});

const LENOVO = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Lenovo'
});

const NOKIA = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Nokia'
});

const SONY = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Sony'
});

const TRANSCEND = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Transcend'
});

const ASUS = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Asus'
});

const DELL = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Dell'
});

const APPLE = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: 'Apple'
});

const NOTEBOOK = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: 'Notebook',
    url: '/notebook'
});
const PHONE = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: 'Phone',
    url: '/phone'
});
const TABLET = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: 'Tablet',
    url: '/tablet'
});
const MP3_PLAYER = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: 'Mp3-player',
    url: '/mp3-player'
});
const ADMIN = new User({
    name: 'admin',
    gender: 'Male',
    firstName: 'Max',
    lastName: 'Chadway',
    email: 'admin@email.com',
    phone: '44 (012) 695 47 83',
    address: {
        street: '106, Pritytskogo Street',
        city: 'Minsk'
    },
    image: '/media/profileImages/default/male.jpg',
    password: 'adminpass',
    role: 'Administrator'
});

const CUSTOMER = new User({
    name: 'guest',
    gender: 'Female',
    firstName: 'Nikki',
    lastName: 'Stone',
    email: 'guest@email.com',
    phone: '44 (710) 695 42 17',
    address: {
        street: '121 A, Rue de Rivoli',
        city: 'Paris'
    },
    image: '/media/profileImages/default/female.jpg',
    password: 'guestpass',
    role: 'user'
});

const LENOVO_SD39 = new Product({
    name: 'Lenovo SD391114',
    description:
        'Monitor 13" / Intel Core I5 (2,4 GHz) / RAM 12 GB / HDD 770 GB / Weight 6,0 kg / Bluetooth / Webcam / LAN / USB / WiFi',
    image: '/media/notebook-1.jpeg',
    price: 1150,
    count: 12,
    producer: {
        _id: LENOVO._id,
        name: LENOVO.name
    },
    category: {
        _id: NOTEBOOK._id,
        name: NOTEBOOK.name
    }
});
const ASUS_HE0657705 = new Product({
    name: 'Asus HE0657705',
    description:
        'Monitor 23" / Intel Core I5 (2,0 GHz) / RAM 4 GB / HDD 630 GB / Weight 3,4 kg / DVD+/-RW / WiFi / Bluetooth / Webcam / USB / Intel HD Graphics / LAN',
    image: '/media/notebook-2.jpeg',
    price: 1200,
    count: 9,
    producer: {
        _id: ASUS._id,
        name: ASUS.name
    },
    category: {
        _id: NOTEBOOK._id,
        name: NOTEBOOK.name
    }
});
const DELL_NV = new Product({
    name: 'Dell NVA0514700',
    description:
        'Monitor 13" / Intel Core I7 (3,2 GHz) / RAM 8 GB / HDD 260 GB / Weight 4,8 kg / Webcam / Intel HD Graphics / LAN',
    image: '/media/notebook-1.jpeg',
    price: 1350,
    count: 8,
    producer: {
        _id: DELL._id,
        name: DELL.name
    },
    category: {
        _id: NOTEBOOK._id,
        name: NOTEBOOK.name
    }
});

const SUMSUNG_HC05 = new Product({
    name: 'Samsung HC0587187',
    description:
        'Diagonal 5,2" / Camera: 2.2Mp / RAM 500 Mb / 1400 mA/h / Orange / Weight 240 g / 2 Sim cards / Dictophone / SD',
    image: '/media/phone-1.jpeg',
    price: 350,
    count: 13,
    producer: {
        _id: SAMSUNG._id,
        name: SAMSUNG.name
    },
    category: {
        _id: PHONE._id,
        name: PHONE.name
    }
});

const NOKIA_CEE = new Product({
    name: 'Nokia CEE9493815',
    description:
        'Diagonal 4,4" / Camera: 2.2Mp / RAM 500 Mb / 1800 mA/h / White / Weight 240 g / Dictophone / Bluetooth / 2 Sim cards / USB',
    image: '/media/phone-2.jpeg',
    price: 250,
    count: 5,
    producer: {
        _id: NOKIA._id,
        name: NOKIA.name
    },
    category: {
        _id: PHONE._id,
        name: PHONE.name
    }
});

const APPLE_VN = new Product({
    name: 'Apple VN6467',
    description:
        'Diagonal 5,6" / Camera: 2.6Mp / RAM 500 Mb / 1200 mA/h / White / Weight 340 g / 2 Sim cards / Bluetooth / Dictophone',
    image: '/media/phone-1.jpeg',
    price: 850,
    count: 7,
    producer: {
        _id: APPLE._id,
        name: APPLE.name
    },
    category: {
        _id: PHONE._id,
        name: PHONE.name
    }
});

const APPLE_FI = new Product({
    name: 'Apple FI00663972',
    description:
        'Monitor 7" / RAM 2 GB / HDD 210 GB / Blue / Weight 140 g / GPS / WiFi / Webcam',
    image: '/media/tablet-2.jpeg',
    price: 975,
    count: 11,
    producer: {
        _id: APPLE._id,
        name: APPLE.name
    },
    category: {
        _id: TABLET._id,
        name: TABLET.name
    }
});

const SAMSUNG_PA = new Product({
    name: 'Samsung PAU06361',
    description:
        'Monitor 8" / RAM 2 GB / HDD 190 GB / Blue / Weight 100 g / Bluetooth / GPS / WiFi',
    image: '/media/tablet-1.jpeg',
    price: 750,
    count: 6,
    producer: {
        _id: SAMSUNG._id,
        name: SAMSUNG.name
    },
    category: {
        _id: TABLET._id,
        name: TABLET.name
    }
});

const LENOVO_UQC = new Product({
    name: 'Lenovo UQC1841726',
    description:
        'Monitor 9" / RAM 2 GB / HDD 80 GB / White / Weight 260 g / GPS / USB / 3G / HDMI',
    image: '/media/tablet-1.jpeg',
    price: 800,
    count: 4,
    producer: {
        _id: LENOVO._id,
        name: LENOVO.name
    },
    category: {
        _id: TABLET._id,
        name: TABLET.name
    }
});

const APPLE_HK = new Product({
    name: 'Apple HK0390207',
    description:
        'Memory 16 Gb / Weight 29 g / White / MP3 / Dictophone / AMV / WAV / FM receiver / WMA / MPEG-4',
    image: '/media/mp3-1.jpeg',
    price: 80,
    count: 16,
    producer: {
        _id: APPLE._id,
        name: APPLE.name
    },
    category: {
        _id: MP3_PLAYER._id,
        name: MP3_PLAYER.name
    }
});

const SONY_QDL = new Product({
    name: 'Sony QDL497766',
    description:
        'Memory 20 Gb / Weight 65 g / White / MP3 / WAV / WMA / OGG / AMV / AVI / MPEG-4 / SD slot',
    image: '/media/mp3-2.jpeg',
    price: 50,
    count: 15,
    producer: {
        _id: SONY._id,
        name: SONY.name
    },
    category: {
        _id: MP3_PLAYER._id,
        name: MP3_PLAYER.name
    }
});

const TRANSCEND_IS = new Product({
    name: 'Transcend ISO35239148',
    description:
        'Memory 20 Gb / Weight 32 g / Silver / MP3 / USB / AMV / Bluetooth / FM receiver / OGG',
    image: '/media/mp3-1.jpeg',
    price: 25,
    count: 10,
    producer: {
        _id: TRANSCEND._id,
        name: TRANSCEND.name
    },
    category: {
        _id: MP3_PLAYER._id,
        name: MP3_PLAYER.name
    }
});

const createProducers = () => {
    console.log('Creating producers..');
    SAMSUNG.save();
    NOKIA.save();
    SONY.save();
    TRANSCEND.save();
    LENOVO.save();
    APPLE.save();
    ASUS.save();
    DELL.save();
};

const createCategories = () => {
    console.log('Creating categories..');
    NOTEBOOK.save();
    PHONE.save();
    TABLET.save();
    MP3_PLAYER.save();
};

const createUser = () => {
    console.log('Creating user..');
    ADMIN.save();
    CUSTOMER.save();
};

const createProducts = () => {
    console.log('Creating products..');
    LENOVO_SD39.save();
    ASUS_HE0657705.save();
    DELL_NV.save();

    SUMSUNG_HC05.save();
    NOKIA_CEE.save();
    APPLE_VN.save();

    APPLE_FI.save();
    SAMSUNG_PA.save();
    LENOVO_UQC.save();

    APPLE_HK.save();
    SONY_QDL.save();
    TRANSCEND_IS.save();
};

const setupDataBase = async () => {
    console.log('Starting delete data...');
    await Producer.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
};

(async function() {
    await setupDataBase();
    console.log('Starting seed...');
    await createProducers();
    await createCategories();
    await createUser();
    await createProducts();
    console.log('Done!');
})();
