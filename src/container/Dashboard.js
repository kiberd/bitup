import Grid from "@mui/material/Grid";
import { PageWrapper } from "lib/style_layout";

// import PriceChart from "../components/PriceChart";
import  PricePanel from "components/PricePanel";

const Dashboard = () => {
	return (
		<PageWrapper>
			<Grid container spacing={2}>
				<Grid item xs={7}>
					차트
				</Grid>
				<Grid item xs={5}>
					<PricePanel />
				</Grid>
			</Grid>
		</PageWrapper>
	);
};

export default Dashboard;
