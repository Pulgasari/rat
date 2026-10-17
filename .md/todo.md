# RAT :: todo

```
- aufgabe für claude
* aufgabe für mich
```

---

- [ ] syntax für css-files import/adopt
  - [ ] `style adopt` + `<style mode='adopt' />`
  - [ ] `style inline` + `<style mode='inline' />`
  - [ ] `style link` + `<style mode='link' />`
  - [ ] default (ohne mode-angabe) = `adopt`
        
```html
<script>
  style link 'https://code.pulgasari.dev/aufbau/css/aufbau.css';
  style adopt 'https://code.pulgasari.dev/aufbau/gestalt/gestalt.css';
  style inline 'localfile.css';
</script>

<style mode='link'   src='https://code.pulgasari.dev/aufbau/css/aufbau.css' />
<style mode='adopt'  src='https://code.pulgasari.dev/aufbau/gestalt/gestalt.css' />
<style mode='inline' src='localfile.css' />
```

