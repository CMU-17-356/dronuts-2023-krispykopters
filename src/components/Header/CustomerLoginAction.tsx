import { Link } from "react-router-dom"
import { MdLogin } from "react-icons/md"
import { motion } from "framer-motion"

const CustomerLoginAction = ({text,  mobile}:{text?:string, mobile?:boolean}) => {
  return (
    <Link to="/customer-login">
        <motion.div
          className={` flex items-center gap-3 border border-slate-200 px-3 py-1 rounded-lg cursor-pointer`}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          
        >
          <MdLogin className={` ${mobile && 'text-2xl text-headingColor'}`} />
          <p className={`text-headingColor ${mobile && 'text-2xl'}`}>
          Customer Login
        </p>
        </motion.div>
    </Link>
  )
}

export default CustomerLoginAction