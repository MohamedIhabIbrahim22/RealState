const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const session = require("express-session"); 
const app = express();
const port = 3000;
const router = express.Router();
app.use(express.json());
const MeetingRequest=require("./models/schedule"); 
const Payment = require('./models/order'); 
 var moment=require('moment');
const schedule = require('./models/schedule');
const PostForSale = require("./models/PostForSale");
const adminRoutes = require('./routes/adminRoutes');
const Feedback = require("./models/feedback");
const User = require('./models/Users');
const Reward = require('./models/reward'); // Correctly import Reward model
app.use(connectLiveReload());
// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for live reload
app.use(connectLiveReload());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.use('/mohamedSite', express.static(path.join(__dirname, 'public/mohamedSite')));
// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');


var methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Real Estate' });
});

app.get('/index.ejs', (req, res) => {
    res.render('index', { title: 'Real Estate' });
});


app.get('/customers.ejs', (req, res) => {
    res.render('customers', { title: 'Real Estate' });
});

app.get('/com.ejs', (req, res) => {
    res.render('com', { title: 'Real Estate' });
});

app.get('/rating.ejs', (req, res) => {
    res.render('rating', { title: 'Real Estate' });
});

app.get('/contactUs.ejs', (req, res) => {
    res.render('contactUs', { title: 'Real Estate' });
});

app.get('/Login1.ejs', (req, res) => {
    res.render('Login1', { title: 'Real Estate' });
});

app.get('/Login2.ejs', (req, res) => {
    res.render('Login2', { title: 'Real Estate' });
});

app.get('/Signup1.ejs', (req, res) => {
    res.render('Signup1', { title: 'Real Estate' });
});


app.get('/aboutUs.ejs', (req, res) => {
    res.render('aboutUs', { title: 'Real Estate' });
});

app.get('/map.ejs', (req, res) => {
    res.render('map', { title: 'Real Estate' });
});

app.get('/ScheduleMeeting.ejs', (req, res) => {
    res.render('ScheduleMeeting', { title: 'Real Estate' });
});

app.get('/feedback.ejs', (req, res) => {
    res.render('feedback', { title: 'Real Estate' });
});

app.get('/sell.ejs', (req, res) => {
    res.render('sell', { title: 'Real Estate' });
});


app.get('/postForSale.ejs', (req, res) => {
    res.render('postForSale', { title: 'Real Estate' });
});

app.get('/Productss.ejs', (req, res) => {
    res.render('Productss', { title: 'Real Estate' });
});









// Connect to MongoDB
mongoose.connect("mongodb+srv://RealStateProject:F2TP4UiebwSv2zKA@databrs.fu7gdx6.mongodb.net/?retryWrites=true&w=majority&appName=DATABRS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    const server = app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });

    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
})
.catch((err) => {
    console.log(err);
});


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ field: 'email', message: 'Email already exists.' });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ field: 'username', message: 'Username already exists.' });
        }
      }
  
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      console.log('New user saved:', newUser);
      res.status(200).json({ message: 'Successfully signed up!' });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post('/', (req, res) => {
    const meetingRequest = new MeetingRequest(req.body);
    meetingRequest.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// POST route to handle form submission
app.post('/', async (req, res) => {
    // Convert meetingDate to UTC string
    const meetingDateUTC = new Date(req.body.meetingDate).toISOString();
    const { phoneNumber, meetingDate, meetingTime } = req.body;

    try {
        const existingRequest = await MeetingRequest.findOne({ $or: [{ phoneNumber }, { meetingDate: meetingDateUTC }] });

        if (existingRequest) {
            // Return an error response if the request already exists
            return res.status(400).json({ message: 'Meeting request already exists.' });
        }

        // Create a new meeting request
        const meetingRequest = new MeetingRequest({
            phoneNumber,
            meetingDate: meetingDateUTC,
            meetingTime
            
        });

        // Save the meeting request
        await meetingRequest.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// POST route to handle form submission for adding new meeting requests
app.post('/add', async (req, res) => {
    // Create a new meeting request based on form data
    const newMeetingRequest = new MeetingRequest({
        phoneNumber: req.body.phoneNumber,
        meetingDate: req.body.meetingDate,
        meetingTime: req.body.meetingTime,
      
    });

    try {
        // Save the new meeting request to the database
        await newMeetingRequest.save();
        res.redirect('/schaduled.ejs'); // Redirect to the home page or wherever appropriate
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/edit', async (req, res) => {
    const { id, phoneNumber, meetingDate, meetingTime } = req.body;

    try {
       
        await schedule.findByIdAndUpdate(id, { phoneNumber, meetingDate, meetingTime });
        res.redirect('/schaduled.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/remove/:id', (req, res) => {
    const p = req.params.id;

    schedule.findByIdAndDelete(p)
        .then((result) => {
            if (result) {
                res.redirect("/schaduled.ejs");
            } else {
                res.status(404).send('schaduled not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting schaduled');
        });
});





app.post('/payment', async (req, res) => {
    const { name, email, address, telephone, city, priceOption, cardName, cardNumber, expMonth, expYear, cvv } = req.body;

    const newPayment = new Payment({
        name,
        email,
        address,
        telephone,
        city,
        priceOption,
        cardName,
        cardNumber,
        expMonth,
        expYear,
        cvv
    });

    try {
        await newPayment.save();
        res.redirect('/payment.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/addOrder', async (req, res) => {
    // Create a new meeting request based on form data
    const p = new Payment({
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
      
    });

    try {
        // Save the new meeting request to the database
        await p.save();
        res.redirect('/orders.ejs'); // Redirect to the home page or wherever appropriate
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/editOrder', async (req, res) => {
    const { id, name, address, telephone } = req.body;

    try {
       
        await Payment.findByIdAndUpdate(id, { name, address, telephone });
        res.redirect('/orders.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/removeOrder', async (req, res) => {
    const orderId = req.body.id; 

    try {
       
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid ID format');
        }

        
        const deletedOrder = await Payment.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/orders.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error removing order'); 
    }
});




app.post('/removeorder/:id', (req, res) => {
    const p = req.params.id;

    Payment.findByIdAndDelete(p)
        .then((result) => {
            if (result) {
                res.redirect("/orders.ejs");
            } else {
                res.status(404).send('orders not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting orders');
        });
});


app.get('/sellerGuide.ejs', (req, res) => {
    res.render('sellerGuide', { title: 'Real Estate' });
});

app.get('/sellerGuide1.ejs', (req, res) => {
    res.render('sellerGuide1', { title: 'Real Estate' });
});

app.get('/homeVestimator.ejs', (req, res) => {
    res.render('homeVestimator', { title: 'Real Estate' });
});

app.get('/orders.ejs',async (req, res) => {
    
        try {
          const orders = await Payment.find().exec();
          res.render('orders', { array: orders });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
   
});
app.get('/schaduled.ejs', (req, res) => {


    MeetingRequest.find().then((data)=>{
        
        console.log(data)
        res.render('schaduled', {arr:data, moment:moment});
    }).catch((err)=>{
        console.log(err)
    
    })


   
});











app.post('/submit-form', (req, res) => {
    const { title, description, price, location } = req.body;

    let imageFile = req.files.image; 

    const newPost = new PostForSale({
        title,
        description,
        price: parseInt(price), 
        location,
        imagePath: imageFile ? `/uploads/${imageFile.name}` : null
    });

    // Save to MongoDB
    newPost.save()
        .then(savedPost => {
            // Move the uploaded file to uploads folder
            if (imageFile) {
                imageFile.mv(path.join(__dirname, 'uploads', imageFile.name), (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.send('Form submitted successfully! waiting for admin response');
                });
            } else {
                res.send('Form submitted successfully!');
            }
        })
        .catch(err => {
            console.error('Error saving post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/admin/approve-post', (req, res) => {
    const postId = req.body.postId;
    PostForSale.findByIdAndUpdate(postId, { status: 'approved' }, { new: true })
        .then(updatedPost => {
            res.send('Post approved successfully');
        })
        .catch(err => {
            console.error('Error approving post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/admin/reject-post', (req, res) => {
    const postId = req.body.postId;
    PostForSale.findByIdAndUpdate(postId, { status: 'rejected' }, { new: true })
        .then(updatedPost => {
            res.send('Post rejected successfully');
        })
        .catch(err => {
            console.error('Error rejecting post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/sellRequests.ejs', async (req, res) => {
    try {
        const posts = await PostForSale.find({}) || []; 
        console.log('Posts:', posts); 
        res.render('sellRequests', { title: 'Sell Requests', posts: posts });
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Internal Server Error');
    }
});

//==========================feedback setion===========================

app.post('/submit-feedback', async (req, res) => {
    console.log('Received feedback submission:', req.body);

    const { type, email, name, feedbackType, comment } = req.body;
    const newFeedback = new Feedback({
        type,
        email,
        name,
        feedbackType,
        comment
    });

    console.log('New feedback object:', newFeedback);

    newFeedback.save()
        .then(savedFeedback => {
            console.log('Feedback saved successfully:', savedFeedback);
            res.send('Form submitted successfully!');
        })
        .catch(err => {
            console.error('Error saving feedback:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/clientFeedback.ejs', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}) || [];     
        console.log("feedbacks: ",feedbacks)    
        res.render('clientFeedback', { feedbacks: feedbacks });
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).send('Internal Server Error');
    }
});




app.get('/agent.ejs', (req, res) => {
    res.render('agent', { title: 'Real Estate' });
});


app.get('/privacy-policy.ejs', (req, res) => {
    res.render('privacy-policy', { title: 'Real Estate' });
});

app.get('/adminAgents.ejs', (req, res) => {
    res.render('adminAgents', { title: 'Real Estate' });
});

app.use(express.urlencoded({ extended: true }));

const Villa = require("./models/VillasSchema.js");
const Apartment = require("./models/ApartmentsSchema.js");


app.post('/villas', upload.single('image'), (req, res) => {
    const villaData = {
        name: req.body.name,
        details: req.body.details,
        beds: req.body.beds,
        livingrooms: req.body.livingrooms,
        toilets: req.body.toilets,
        garden: req.body.garden,
        swimmingpools: req.body.swimmingpools,
        price: req.body.price,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };

    const newVilla = new Villa(villaData);

    newVilla.save()
    .then(() => {
        res.redirect("./AdminVillas.ejs");
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/villas/delete/:id', (req, res) => {
    const villaId = req.params.id;

    Villa.findByIdAndDelete(villaId)
        .then((result) => {
            if (result) {
                res.redirect("/AdminVillas.ejs");
            } else {
                res.status(404).send('Villa not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting villa');
        });
});


app.post('/villas', upload.single('image'), (req, res) => {
    const villaData = {
        name: req.body.name,
        details: req.body.details,
        beds: req.body.beds,
        livingrooms: req.body.livingrooms,
        toilets: req.body.toilets,
        garden: req.body.garden,
        swimmingpools: req.body.swimmingpools,
        price: req.body.price,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };

    const newVilla = new Villa(villaData);

    newVilla.save()
    .then(() => {
        res.redirect("./AdminVillas.ejs");
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/villas/edit/:id', upload.single('image'), [
    check('name').notEmpty().withMessage('Name is required'),
    check('details').notEmpty().withMessage('Details are required'),
    check('beds').isInt({ min: 0 }).withMessage('Beds must be a non-negative integer'),
    check('livingrooms').isInt({ min: 0 }).withMessage('Living rooms must be a non-negative integer'),
    check('toilets').isInt({ min: 0 }).withMessage('Toilets must be a non-negative integer'),
    check('garden').isInt({ min: 0 }).withMessage('Garden must be a non-negative integer'),
    check('swimmingpools').isInt({ min: 0 }).withMessage('Swimming pools must be a non-negative integer'),
    check('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, log them and return a response with the errors
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated data
    const updateData = {
        name: req.body.name,
        details: req.body.details,
        beds: req.body.beds,
        livingrooms: req.body.livingrooms,
        toilets: req.body.toilets,
        garden: req.body.garden,
        swimmingpools: req.body.swimmingpools,
        price: req.body.price,
    };

    // Check for file upload
    if (req.file) {
        updateData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }   

    // Update the villa in the database
    Villa.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(() => {
        res.redirect('/AdminVillas.ejs');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Server Error');
    });
});



app.get('/AdminVillas.ejs', (req, res) => {
    Villa.find().then((result)=>{
        res.render('AdminVillas', { title: 'Real Estate',arr : result });
    }).catch((err)=>{
        console.log(err);
    })
});
function bufferToBase64(buffer) {
    return buffer.toString('base64');
}

module.exports = { bufferToBase64 };
app.get('/Villas.ejs', (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const propertiesPerPage = 3;

    Villa.find()
        .then((result) => {
            const totalVillas = result.length;
            const totalPages = Math.ceil(totalVillas / propertiesPerPage);

            const startIndex = (currentPage - 1) * propertiesPerPage;
            const endIndex = Math.min(startIndex + propertiesPerPage, totalVillas);

            const propertiesToShow = result.slice(startIndex, endIndex);

            res.render('Villas', {
                title: 'Real Estate',
                arr: propertiesToShow,
                bufferToBase64: bufferToBase64,
                currentPage: currentPage,
                totalPages: totalPages
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching villas');
        });
});

app.get('/page.ejs', (req, res) => {
    const btn = req.query.btn;
    Villa.find().then((result)=>{
        res.render('page', { title: 'Real Estate',arr : result ,b:btn});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/images/:id', (req, res) => {
    Villa.findById(req.params.id, (err, villa) => {
        if (err || !villa) {
            res.status(404).send('Image not found');
        } else {
            res.set('Content-Type', villa.image.contentType);
            res.send(villa.image.data);
        }
    });
});


app.post('/payment', (req, res) => {
    const paydata = {
        'pay-name': { type: String, required: true },
        'pay-email': { type: String, required: true },
         property: {type: String, required: true},
        'pay-price': { type: String, required: true}
    };

    const newpay = new Payment(paydata);

    newpay.save()
    .then(() => {
        res.redirect("./page.ejs");
    })
    .catch((err) => {
        console.log(err);
    });
});


app.post('/Apartments', upload.single('image'), (req, res) => {
    const data = {
        name: req.body.name,
        details: req.body.details,
        beds: req.body.beds,
        livingrooms: req.body.livingrooms,
        toilets: req.body.toilets,
        garden: req.body.garden,
        swimmingpools: req.body.swimmingpools,
        price: req.body.price,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };

    const newApartment = new Apartment(data);

    newApartment.save()
    .then(() => {
        res.redirect("./AdminApartments.ejs");
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/AdminApartments.ejs', (req, res) => {
    Apartment.find().then((result)=>{
        res.render('AdminApartments', { title: 'Real Estate',arr : result });
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/Apartments.ejs', (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const propertiesPerPage = 3;

    Villa.find()
        .then((result) => {
            const totalVillas = result.length;
            const totalPages = Math.ceil(totalVillas / propertiesPerPage);

            const startIndex = (currentPage - 1) * propertiesPerPage;
            const endIndex = Math.min(startIndex + propertiesPerPage, totalVillas);

            const propertiesToShow = result.slice(startIndex, endIndex);

            res.render('Apartments', {
                title: 'Real Estate',
                arr: propertiesToShow,
                bufferToBase64: bufferToBase64,
                currentPage: currentPage,
                totalPages: totalPages
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetching Apartments');
        });
});

app.post('/Apartments/delete/:id', (req, res) => {
    const ApartmentId = req.params.id;

    Apartment.findByIdAndDelete(ApartmentId)
        .then((result) => {
            if (result) {
                res.redirect("/AdminApartments.ejs");
            } else {
                res.status(404).send('Apartment not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting Apartment');
        });
});


app.get('/pageApartments.ejs', (req, res) => {
    const btn = req.query.btn;
    Apartment.find().then((result)=>{
        res.render('pageApartments', { title: 'Real Estate',arr : result ,b:btn});
    }).catch((err)=>{
        console.log(err);
    })
});


app.get('/AdminpageApartments.ejs', (req, res) => {
    const btn = req.query.btn;
    Apartment.find().then((result)=>{
        res.render('AdminpageApartments', { title: 'Real Estate',arr : result ,b:btn});
    }).catch((err)=>{
        console.log(err);
    })
});


app.get('/Adminpage.ejs', (req, res) => {
    const btn = req.query.btn;
    Villa.find().then((result)=>{
        res.render('Adminpage', { title: 'Real Estate',arr : result ,b:btn});
    }).catch((err)=>{
        console.log(err);
    })
});











const bcrypt = require('bcryptjs');


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});





app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.userId = user._id;
        req.session.email = user.email;
        res.status(200).json({ message: 'Successfully logged in' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});







app.post('/login2', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        req.session.userId = user._id;
        req.session.email = user.email;

        res.redirect('/payment.ejs');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});


app.get('/payment.ejs', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login2.ejs');
    }

    res.render('payment', { user: req.session });
});


app.get('/Dashboard2.ejs', (req, res) => {
    // if (!req.session.adminId) {
    //     return res.redirect('/login1.ejs');
    // }

    res.render('Dashboard2', { user: req.session });
})

app.post('/Apartments/edit/:id', upload.single('image'), [
    check('name').notEmpty().withMessage('Name is required'),
    check('details').notEmpty().withMessage('Details are required'),
    check('beds').isInt({ min: 0 }).withMessage('Beds must be a non-negative integer'),
    check('livingrooms').isInt({ min: 0 }).withMessage('Living rooms must be a non-negative integer'),
    check('toilets').isInt({ min: 0 }).withMessage('Toilets must be a non-negative integer'),
    check('garden').isInt({ min: 0 }).withMessage('Garden must be a non-negative integer'),
    check('swimmingpools').isInt({ min: 0 }).withMessage('Swimming pools must be a non-negative integer'),
    check('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, log them and return a response with the errors
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated data
    const updateData = {
        name: req.body.name,
        details: req.body.details,
        beds: req.body.beds,
        livingrooms: req.body.livingrooms,
        toilets: req.body.toilets,
        garden: req.body.garden,
        swimmingpools: req.body.swimmingpools,
        price: req.body.price,
    };

    // Check for file upload
    if (req.file) {
        updateData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    Apartment.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(() => {
        res.redirect('/AdminApartments.ejs');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Server Error');
    });
});




const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log(response.data);
        // Process the response data as needed
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();




app.get('/api/posts', async (req, res) => {
    try {
        const posts = await PostForSale.find();
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Example: Get a specific post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await PostForSale.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Example: Create a new post
app.post('/api/posts', async (req, res) => {
    const { title, description, price, location } = req.body;
    try {
        const newPost = new PostForSale({ title, description, price, location });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Example: Update a post by ID
app.put('/api/posts/:id', async (req, res) => {
    const { title, description, price, location } = req.body;
    try {
        const updatedPost = await PostForSale.findByIdAndUpdate(
            req.params.id,
            { title, description, price, location },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Example: Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const deletedPost = await PostForSale.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/external-data', async (req, res) => {
    try {
        // Make a GET request to an external API
        const response = await axios.get('https://api.example.com/data');
        
        // Handle the API response data
        const externalData = response.data;

        // Render a view or send the data back as JSON
        res.json(externalData);
    } catch (error) {
        console.error('Error fetching external data:', error);
        res.status(500).send('Internal Server Error');
    }
});