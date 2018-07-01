import React from "react";
// material-ui components
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Power, VerifiedUser, AddToQueue } from "@material-ui/icons";

// import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "components/Card/Card.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import campaignStyle from "assets/jss/next-genius/views/tronPageSections/campaignStyle.jsx";

import srelection from "assets/img/tron/srelection.jpg";

class CampaignSection extends React.Component {
  render() {
    const {classes} = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgElection, classes.imgGallery);
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
                <h2 className={classes.title}>Our Rewards Plans</h2>
                <h5 className={classes.description}>
                  To show appreciation for everyone's support and give back to the community,
                  we have decided to return 100% of the profit from operating the super node to our voters if we were elected.
                </h5>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <div className={classes.note} xs={12} sm={12} md={6}>
                  <ol><strong>All you need to do:</strong>
                    <li>Vote for over 100,000 TRX</li>
                    <li>Keep your votes locked from June 26th, to July 31st</li>
                    <li>Register your wallet address and email below</li>
                  </ol>
                </div>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
                <h2 className={classes.title}>我们的奖励计划</h2>
                <h5 className={classes.description}>
                  为了表示感谢，回馈社区，我们决定在成功入选超级节点后将扣除运营成本之后的100%盈利返还给投票者。
                </h5>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <div className={classes.note} xs={12} sm={12} md={6}>
                  <ol><strong>您只需要做到以下几点：</strong>
                    <li>对我们投票超过10万TRX</li>
                    <li>将该投票在6月26日到7月31日之间锁定</li>
                    <li>在以下表格中注册您的钱包地址和邮件地址</li>
                  </ol>
                </div>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(campaignStyle)(CampaignSection);
