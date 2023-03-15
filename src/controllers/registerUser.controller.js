const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localstrat = require('../passport/localstrategy');
const jwtstrat = require('../passport/jwtstrategy');
const passport = require('passport');
const config = require('../config');

module.exports = async (req, res) => {
  const { names, surnames, email, password, orgCode } = req.body;
  
  const hashCost = config.hashCost || 13;
    
  try {
    const password = await bcrypt.hash(password, hashCost);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        names: names,
        surnames: surnames,
        role_id: prisma.role.findFirst({ where: { name: 'user' } }).id,
      }
    })

    if(orgCode){
      const organization = await prisma.organizations.findUnique({ where: { short_code: orgCode }}) 
      if(!organization){
        return res.status(400).json({ err: 'Organization not found' })
      }

      members_json = JSON.parse(organization.members)
      members_json.push(user.id)

      prisma.organization.update({
        where: { id: organization.id },
        data: {
          members: members_json
        }
      })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}