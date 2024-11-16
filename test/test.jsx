<ul className='flex flex-col md:flex-row justify-between items-center absolute top-0 z-30 w-full text-white px-[160px] pt-12 text-lg nav'>
        <li className="relative group">
            <Link className='link' href={""} aria-haspopup="true" aria-expanded="false">Portal ▼</Link>
            <div className='dropdown__menu group-hover:block'>
                <ul className="w-auto">
                    <li><Link className='link' href={"/student/login"}>Student</Link></li>
                    <li><Link className='link' href={"/instructor/login"}>Instructor</Link></li>
                </ul>
            </div>
        </li>

        <li><Link className='link' href={"/enrollment"}>Enrollment</Link></li>
        
        <li className="relative group">
            <Link className='link' href={""} aria-haspopup="true" aria-expanded="false">Organizations ▼</Link>
            <div className='dropdown__menu group-hover:block'>
                <ul className="w-auto">
                    <li><Link className='link' href={"/organizations/css"}>CSS</Link></li>
                    <li><Link className='link' href={""}>Sandbox</Link></li>
                </ul>
            </div>
        </li>

        <li><Link className='link' href={"/"}><Image height={100} width={100} src={require("../../public/images/cdm-logo.png")} alt="CDM Logo" /></Link></li>

        <li className="relative group">
            <Link className='link' href={""} aria-haspopup="true" aria-expanded="false">Administrations ▼</Link>
            <div className='dropdown__menu group-hover:block'>
                <ul className="w-full">
                    <li className='w-[300px]'><Link className='link' href={""}>Office of the President</Link></li>
                    <li><Link className='link' href={""}>Registrar</Link></li>
                </ul>
            </div>
        </li>

        <li><Link className='link' href={"/programs"}>Programs</Link></li>

        <li><Link className='link' href={"/about"}>About</Link></li>
    </ul>