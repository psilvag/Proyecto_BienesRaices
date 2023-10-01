
import bcrypt from 'bcrypt'

const usuarios=[
    {
       nombre:"Pablo Silva",
       email:"pablo@gmail.com",
       password:bcrypt.hashSync('pablo2023',10),
       confirmado:1

       
    }
]

export default usuarios