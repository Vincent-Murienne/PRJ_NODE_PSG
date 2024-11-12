import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return <>
        <nav>nav</nav>
        <Outlet />
        <footer>footer</footer>
    </>;
};

export default BaseLayout;