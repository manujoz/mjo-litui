import { expect } from "@esm-bundle/chai";
import { fixture, nextFrame } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

suite("mjo-calendar reset()", () => {
    test("reset clears single selection and months reinitialize", async () => {
        const cal = await fixture<any>('<mjo-calendar mode="single" name="d"></mjo-calendar>');
        // simular selección directa
        const today = new Date();
        const dateString = today.toISOString().slice(0, 10);
        cal.dispatchEvent(
            new CustomEvent("date-selected", {
                detail: { date: today, dateString, value: dateString },
                bubbles: true,
                composed: true,
            }),
        );
        cal.value = dateString; // reflejar valor como si hubiese seleccionado
        await nextFrame();
        expect(cal.value).to.equal(dateString);
        cal.reset();
        await nextFrame();
        expect(cal.value).to.be.undefined;
        expect(cal.startDate).to.be.undefined;
        expect(cal.endDate).to.be.undefined;
        const after = cal.getDisplayedMonths();
        expect(after.length).to.be.greaterThan(0);
    });

    test("reset clears range selection and hover state", async () => {
        const cal = await fixture<any>('<mjo-calendar mode="range" name="r" range-calendars="2"></mjo-calendar>');
        const start = new Date();
        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 2);
        const startStr = start.toISOString().slice(0, 10);
        const endStr = end.toISOString().slice(0, 10);
        cal.startDate = startStr;
        cal.endDate = endStr;
        await nextFrame();
        expect(cal.startDate).to.equal(startStr);
        expect(cal.endDate).to.equal(endStr);
        cal.reset();
        await nextFrame();
        expect(cal.startDate).to.be.undefined;
        expect(cal.endDate).to.be.undefined;
        expect(cal.value).to.be.undefined;
    });
});
