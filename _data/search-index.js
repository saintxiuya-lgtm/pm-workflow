const phases = require('./phases.json');
const toolsData = require('./tools.json');

const items = [];

// Index phases
phases.forEach(phase => {
  items.push({
    title: phase.name + ' — ' + phase.short,
    desc: phase.description,
    text: [phase.name, phase.short, phase.description, ...(phase.questions || [])].join(' '),
    type: 'phase',
    href: '/' + phase.id + '/',
    icon: phase.icon
  });
  (phase.skills || []).forEach(skill => {
    items.push({
      title: skill.name,
      cmd: skill.cmd,
      desc: skill.desc,
      text: [skill.name, skill.cmd, skill.desc, skill.when || ''].join(' '),
      type: 'skill',
      href: '/' + phase.id + '/',
      phase: phase.name
    });
  });
});

// Index tools
(toolsData.sections || []).forEach(section => {
  (section.items || []).forEach(tool => {
    items.push({
      title: tool.title,
      cmd: tool.cmd,
      desc: tool.desc,
      text: [tool.icon, tool.title, tool.cmd, tool.desc].join(' '),
      type: 'tool',
      href: '/tools/'
    });
  });
});

module.exports = items;
