import { useMemo } from "react";
import { 
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link className={classes.link} onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
          <td>{launch.userID.firstName} {launch.userID.lastName}</td>
        </tr>;
      });
  }, [launches, abortLaunch, classes.link]);

  return <Appear id="upcoming" animate show={entered}>
    <Paragraph >Upcoming missions for your newly scheduled rockets' launches including SpaceX launches.</Paragraph>
    <Words >Warning! Clicking on the ✖ aborts the mission.</Words>
    <Table animate >
      <table style={{tableLayout: "fixed", width: "200%"}}>
        <thead>
          <tr>
            <th style={{ width: "5%"}}  ></th>
            <th style={{ width: "7%"}}  >No.</th>
            <th >Date</th>
            <th >Mission</th>
            <th >Rocket</th>
            <th >Destination</th>
            <th >User</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </Table>
  </Appear>;
}

export default withStyles(styles)(Upcoming);