import wixData from 'wix-data';
import wixWindow from 'wix-window';

$w.onReady(function () {
  $w("#submitButton").onClick(async () => {
    const registrationNumber = $w("#registrationNo").value;
    const chassisNumber = $w("#chassisNo").value;
    const engineNumber = $w("#engineNo").value;

    // Query for any match
    const results = await wixData.query("Vehicles")
      .eq("registrationNo", registrationNumber)
      .or(
        wixData.query("Vehicles")
          .eq("chassisNo", chassisNumber)
      )
      .or(
        wixData.query("Vehicles")
          .eq("engineNo", engineNumber)
      )
      .find();

    // Check if any of the queries has results
    if (results.items.length > 0) {
      wixWindow.openLightbox("STOLEN");
    } else {
      wixWindow.openLightbox("NOT");
    }
  });
});
