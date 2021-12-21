import Grid from "@mui/material/Grid";
import { PageWrapper } from "lib/style_layout";

// import PriceChart from "../components/PriceChart";
import PriceChartContainer from "./PriceChartContainer";
import PricePanelContainer from "components/PricePanelContainer";

const Dashboard = () => {
	return (
		<PageWrapper>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<PriceChartContainer/>
				</Grid>
				<Grid item xs={4}>
					<PricePanelContainer />
				</Grid>
			</Grid>
		</PageWrapper>
	);
};

export default Dashboard;
