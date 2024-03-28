import jwt from 'jsonwebtoken'

const GenerateToken = async(res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:'1h',
    })

  res.cookie('jwt',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })

   
}

export default GenerateToken