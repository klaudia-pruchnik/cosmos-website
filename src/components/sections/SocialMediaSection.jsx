import FluidContainer from "../layout/FluidContainer";
import { DUMMY_ICONS } from "../../data/socialMediaIcons";
import classes from "./SocialMediaSection.module.css";

export default function SocialMediaSection({ titleText }) {
  return (
    <FluidContainer sectionId="section-social-media">
      <h2>{titleText}</h2>
      <div className={`row ${classes.socialIconsContainer}`}>
        {DUMMY_ICONS.map((icon) => {
          return (
            <div className="col-md-3 col-sm-6" key={icon.id}>
              <a href={icon.href}>
                <img src={icon.src} className={classes.socialIcon} />
              </a>
            </div>
          );
        })}
      </div>
    </FluidContainer>
  );
}
