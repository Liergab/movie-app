import jwt from 'jsonwebtoken'

const GenerateToken = async(res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:'7s',
    })

  res.cookie('jwt',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'None', // Prevent CSRF attacks
    maxAge: 30 * 1000, // 30 day
  })

   
}

export default GenerateToken