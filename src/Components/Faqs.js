import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import pic from "../Images/geogecko.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "20%",
    flexShrink: 0,
  },
  
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root} id="faq">
      <div id="faqTitle">
      <h1>FAQ's - Frequently Asked Questions</h1>
      </div>
      <div className="faqContent">
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            1. How do i get to know, very well, what I have searched for ?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            When done with filtering through various agricultural indicators,
            the map records the changes and shows areas for which your criteria
            is valid. What you search for is reflected in the remaining grid
            cells on the map.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            2. I don't understand the grid cells, how do they work ?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Each grid cell on the map represents the size of land in square
            kilometers on the ground. Forexample, Each grid cell on the map
            shown in this portal represents 5km x 5km square kilometre areas on
            the ground.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            3. Can this web portal be used on phone ?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            No, this web portal can only be viewed and utilised efficiently on
            large and medium displays forexample desktop computers, laptops and
            tablets.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            4. How do I monitor my land ?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            This portal can help you to know the status of your farm land and
            you can make a proper decision basing on the data and statistics
            shown. However for more services such as monitoring your land,
            contact Geo Gecko for more discussions on how we can best serve you.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            5. Do I need membership to frequently use this portal ?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            No, you don't need membership. But you can leave your contact and in
            the feedback link at the bottom left corner of this portal, Thank
            you.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            6. Can I use one indicator to determine what I want?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Yes you can use one indicator to determine what you want. You are at
            liberty to use any number / combination of the available indicators
            so as to amplify your search.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            7. Can there be other indicators to add in this portal?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Yes please. If required send us an email via the feedback section.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            8. What does the box in the top right corner show?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <img id="pic" src={pic} alt="District name" /> <br />
            <br />
            This feature shows the name of the district that is being hovered
            over. After filtering, the box will show the number of grid cells
            that match your criteria.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
      
    </div>
  );
}
